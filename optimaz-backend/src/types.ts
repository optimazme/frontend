export type Metadata = {
    name: string;
    description: string;
    image: string;
    mazeWords: string;
  };
  
  export type Token = {
    data: Metadata;
    tokenId: string;
    id: string;
  };
  
  export type ApiResponse = {
    hasNextPage: boolean;
    totalCount: number;
    data: Token[];
  };
  
  export type modelParameters = {
    prompt: string
    num_inference_steps: number,
    guidance_scale: number,
    height: number,
    width: number,
    seed: number
  }

  export type Prompt = {
      tokenId: string,
      prompt: string
  }

  export type bananApiResponse = {
    id: string,
    message: string,
    created: number,
    apiVersion: string,
    modelOutputs: modelOutput[]
  }

  export type modelOutput = {
    image_base64: BigUint64Array
  }