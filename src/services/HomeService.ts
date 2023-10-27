import { Inject, Service } from 'typedi';
import { S3Service } from './S3Service';
import { HomeRepository } from '../repository/HomeRepository';
import { IHomeRepository } from '../repository/Interfaces/IHomeRepository';
import { IHomeService } from './Interfaces/IHomeService';

@Service()
export class HomeService implements IHomeService {

	@Inject(() => HomeRepository)
	private movieRepository!: IHomeRepository;

	@Inject(() => S3Service)
	private s3Service!: S3Service;

    public async getHomePosters() {
        try{
            var posters:string[]; 
            posters = ["1", "2", "3", "4","5"];
            for (let i = 0; i < 5; i++) {
                posters[i]=await this.s3Service.getObjectUrl('home/posters/'.concat((i+1).toString(),'.jpg'));
            }
            return posters;
        }catch{
            throw new Error('Method not implemented.');
        }
    }
}