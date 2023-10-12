import { Model } from 'sequelize';

export interface BaseInterface {
	save(data: any): Promise<void>;
	findById(id: number): Promise<any | null>;
	delete(model: Model<any>): Promise<void>;
	findMany(): Promise<any[]>;
}
