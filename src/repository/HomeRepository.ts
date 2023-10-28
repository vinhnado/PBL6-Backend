import Database from '../config/database';
import { Op, QueryTypes, literal, OrderItem, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { IHomeRepository } from './Interfaces/IHomeRepository';

const db = Database.getInstance();


@Service()
export class HomeRepository implements IHomeRepository {
    getHomePoster(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
}

