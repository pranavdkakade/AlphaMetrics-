from functools import lru_cache


@lru_cache(maxsize=1)
def get_torchvision_feature_extractor():
	"""Load ResNet18 feature extractor once; return None if unavailable."""
	try:
		import torch
		import torch.nn as nn
		from torchvision.models import ResNet18_Weights, resnet18

		model = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
		model.fc = nn.Identity()
		model.eval()
		return model
	except Exception:
		return None
