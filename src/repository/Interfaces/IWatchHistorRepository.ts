import { User } from '../../models/User';
import { BaseInterface } from './BaseInterface';

export interface IWatchHistoryRepository extends BaseInterface {
	findAll: (userId: number) => Promise<User | null>;
}
