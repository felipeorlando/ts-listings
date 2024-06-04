import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export const app = express();
app.use(express.json());

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
}

let listings: Listing[] = [];

app.get('/listings', (_req: Request, res: Response) => {
  res.status(200).send(listings);
});

app.post('/listings', (req: Request, res: Response) => {
  const { title, price, description }: Listing = req.body;
  const id = uuid();

  const newListing: Listing = {
    id,
    title,
    price,
    description,
  };

  listings.push(newListing);

  res.status(201).send(newListing);
});

app.delete('/listings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  listings = listings.filter((listing) => listing.id !== id);
  res.status(200).send({ message: 'Deleted' })
});
