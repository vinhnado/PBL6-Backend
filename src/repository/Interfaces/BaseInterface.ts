import { Model } from "sequelize";

export interface BaseInterface{

    getAll(): Promise<Model[]>;

    find(id: number): Promise<Model>;

    create(model: Model):Promise<void>;

    update(model: Model):Promise<void>;

    delete(id: number): Promise<void>;
}