def similarity_quality_label(score: float) -> str:
	if score >= 0.92:
		return "very_high"
	if score >= 0.82:
		return "high"
	if score >= 0.72:
		return "medium"
	if score >= 0.62:
		return "low"
	return "very_low"
