import { ConverterRepository } from '@/repositories/converter.repository';

const repositories: { [key: string ]: any } = {
    converter: new ConverterRepository,
};

export const repositoryFactory = {
    get: (name: string) => repositories[name],
};
