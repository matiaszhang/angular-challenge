import { Request, Response } from "express";
import { Product, IProduct } from "../models/product.model";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  const newProduct = new Product(req.body);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  const id = req.params.id;
  const productUpdates: IProduct = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, productUpdates, {
      new: true,
    });

    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}
