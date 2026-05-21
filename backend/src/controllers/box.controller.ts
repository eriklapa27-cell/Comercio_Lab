import { Request, Response } from 'express';

export const boxController = {
  getAll: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  getById: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented', id: req.params.id });
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
