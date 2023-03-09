interface SceneData {
  sceneName: string;
  nextPage: string;
}

interface SceneResponse {
  isError: boolean;
  isSuccess: boolean;
  sceneData: SceneData;
}

const useScene = (defaultData?: SceneData): SceneResponse => {
  const isError = false;
  const isSuccess = true;
  const sceneData: SceneData = {
    sceneName: defaultData?.sceneName || 'Landing',
    nextPage: defaultData?.nextPage || 'Story'
  }

  return {
    isError,
    isSuccess,
    sceneData,
  }
}

export default useScene;