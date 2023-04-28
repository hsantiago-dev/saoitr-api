

import { ContributorEntity } from "../../core/domain/entities/contributor.entity";
import { ContributorInMemoryRepository } from "./contributor-in-memory.repository";

describe('ContributorInMemoryRepository', () => {
  it('should be defined', () => {
    expect(ContributorInMemoryRepository).toBeDefined();
  })

  it('should be create', async () => {

    const repository = new ContributorInMemoryRepository();

    const contributorCreate = new ContributorEntity(
      {
        name: 'test',
        email: 'teste@mail.com',
        password: '123456'
      }
    )

    const contributorCreated = await repository.create(contributorCreate);
    console.log(contributorCreated);

    expect(contributorCreated.id).toBeDefined();
    expect(contributorCreated.name).toBe(contributorCreate.name);
    expect(contributorCreated.email).toBe(contributorCreate.email);
  })
});