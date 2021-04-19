interface ConstructorType {
  new (): void;
}

interface FunctionType {
  (): void;
}

export const REGISTRY: {
  [suiteName: string]: {
    title: string;
    target: ConstructorType;
    tests: Array<{ method: FunctionType; description: string }>;
  };
} = {};

export const TestSuite = (title: string) => {
  return (target: ConstructorType) => {
    target.prototype.title = title;
    if (!REGISTRY.hasOwnProperty(target.name)) REGISTRY[target.name] = { tests: [], title, target };
    REGISTRY[target.name]['title'] = title;
    REGISTRY[target.name]['target'] = target;
  };
};

export function Test(description: string): MethodDecorator {
  /* eslint-disable @typescript-eslint/no-unused-vars-experimental */
  return (target: ConstructorType, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    /* eslint-enable @typescript-eslint/no-unused-vars-experimental */
    const className = target.constructor.name;
    if (!REGISTRY.hasOwnProperty(className)) REGISTRY[className] = { tests: [], target: null, title: null };
    REGISTRY[className].tests.push({ description, method: descriptor.value });
  };
}
