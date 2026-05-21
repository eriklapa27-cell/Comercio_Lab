import { Request, Response } from 'express';

export const couponController = {
  getAll: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  getByCode: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', code: req.params.code });
  },

  create: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  update: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', id: req.params.id });
  },

  remove: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', id: req.params.id });
  },
};
