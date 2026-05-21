import { Request, Response } from 'express';

export const userController = {
  register: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  login: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  getProfile: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },

  updateProfile: (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
};
