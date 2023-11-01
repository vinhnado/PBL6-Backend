import { Inject, Service } from 'typedi';
import { SubcriptionRepository } from '../repository/SubcriptiionRepository';

@Service()
export class SupcriptionService {
	@Inject(() => SubcriptionRepository)
	private subcriptionRepository!: SubcriptionRepository;

	createOrUpdate = async();
}
