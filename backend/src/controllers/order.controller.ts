import { Request, Response } from 'express';

export const orderController = {
  getAll: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  getMyOrders: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  getById: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', id: req.params.id });
  },

  create: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  updateStatus: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', id: req.params.id });
  },
};
