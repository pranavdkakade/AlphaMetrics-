from typing import Any

import numpy as np


def cosine_similarity(vector_a: list[float], vector_b: list[float]) -> float:
	a = np.asarray(vector_a, dtype=np.float32)
	b = np.asarray(vector_b, dtype=np.float32)
	if a.shape != b.shape:
		return -1.0

	a_norm = np.linalg.norm(a)
	b_norm = np.linalg.norm(b)
	if a_norm == 0.0 or b_norm == 0.0:
		return -1.0

	return float(np.dot(a, b) / (a_norm * b_norm))


def find_best_matches(
	query_embedding: list[float],
	candidates: list[dict[str, Any]],
	top_k: int = 3,
) -> list[dict[str, Any]]:
	scored: list[dict[str, Any]] = []
	for item in candidates:
		score = cosine_similarity(query_embedding, item["embedding"])
		scored.append(
			{
				"product_id": item["id"],
				"name": item["name"],
				"buying_price": item["buying_price"],
				"quantity": item["quantity"],
				"similarity_score": round(score, 6),
			}
		)

	scored.sort(key=lambda row: row["similarity_score"], reverse=True)
	return scored[:top_k]
