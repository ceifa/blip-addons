import { BlipsExtension } from './BlipsExtension';

const extension = new BlipsExtension().start();

extension.onBuilderLoad(extension.runFeatures);
