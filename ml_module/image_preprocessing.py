from pathlib import Path

import cv2
import numpy as np


def read_and_preprocess_image(image_path: str | Path, image_size: int = 224) -> np.ndarray:
	"""Load image in RGB, resize, and normalize to [0, 1]."""
	path = Path(image_path)
	image = cv2.imread(str(path), cv2.IMREAD_COLOR)
	if image is None:
		raise ValueError(f"Unable to read image: {path}")

	image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
	image = cv2.resize(image, (image_size, image_size), interpolation=cv2.INTER_AREA)
	return image.astype(np.float32) / 255.0


def build_handcrafted_features(image_rgb: np.ndarray) -> np.ndarray:
	"""Build robust fallback features from color histograms and edge texture."""
	if image_rgb.ndim != 3 or image_rgb.shape[-1] != 3:
		raise ValueError("Expected RGB image with shape (H, W, 3)")

	image_u8 = (np.clip(image_rgb, 0.0, 1.0) * 255.0).astype(np.uint8)

	# Per-channel color histograms capture appearance and improve matching stability.
	hist_features: list[np.ndarray] = []
	for channel_index in range(3):
		hist = cv2.calcHist([image_u8], [channel_index], None, [32], [0, 256]).flatten()
		hist = hist / (np.linalg.norm(hist) + 1e-8)
		hist_features.append(hist)

	gray = cv2.cvtColor(image_u8, cv2.COLOR_RGB2GRAY)
	edges = cv2.Canny(gray, 60, 180)
	edge_hist = cv2.calcHist([edges], [0], None, [32], [0, 256]).flatten()
	edge_hist = edge_hist / (np.linalg.norm(edge_hist) + 1e-8)

	feature_vector = np.concatenate([*hist_features, edge_hist]).astype(np.float32)
	return feature_vector / (np.linalg.norm(feature_vector) + 1e-8)
