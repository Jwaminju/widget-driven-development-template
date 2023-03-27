// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {GameStateData} from "../../hooks/useGameState";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameStateData>
) {
  res.status(200);
}
