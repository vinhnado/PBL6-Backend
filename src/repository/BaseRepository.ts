import { Model } from "sequelize";
import { BaseInterface } from "./Interfaces/BaseInterface";

export abstract class BaseRepository implements BaseInterface{

    

    getAll(): Promise<Model<any, any>[]> {
        throw new Error("Method not implemented.");
    }
    find(id: number): Promise<Model<any, any>> {
        throw new Error("Method not implemented.");
    }
    create(model: Model<any, any>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(model: Model<any, any>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}