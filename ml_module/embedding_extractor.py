from pathlib import Path

import numpy as np

from ml_module.image_preprocessing import build_handcrafted_features, read_and_preprocess_image
from ml_module.module_loader import get_torchvision_feature_extractor


def _normalize(vector: np.ndarray) -> np.ndarray:
	return vector / (np.linalg.norm(vector) + 1e-8)


def _extract_deep_embedding(image_rgb: np.ndarray) -> np.ndarray | None:
	model = get_torchvision_feature_extractor()
	if model is None:
		return None

	try:
		import torch

		tensor = torch.from_numpy(image_rgb).permute(2, 0, 1).unsqueeze(0).float()
		mean = torch.tensor([0.485, 0.456, 0.406]).view(1, 3, 1, 1)
		std = torch.tensor([0.229, 0.224, 0.225]).view(1, 3, 1, 1)
		tensor = (tensor - mean) / std

		with torch.inference_mode():
			vector = model(tensor).squeeze(0).detach().cpu().numpy().astype(np.float32)
		return _normalize(vector)
	except Exception:
		return None


def extract_embedding_from_file(image_path: str | Path) -> list[float]:
	"""Extract robust embedding; use CNN features, then fuse handcrafted fallback."""
	image_rgb = read_and_preprocess_image(image_path)

	deep_vector = _extract_deep_embedding(image_rgb)
	handcrafted_vector = build_handcrafted_features(image_rgb)

	if deep_vector is None:
		return handcrafted_vector.astype(float).tolist()

	# Weighted fusion makes matching stable even when lighting/background varies.
	fused = np.concatenate([0.85 * deep_vector, 0.15 * handcrafted_vector]).astype(np.float32)
	fused = _normalize(fused)
	return fused.astype(float).tolist()
