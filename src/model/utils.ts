export const safeCall = async <T>(
  call: () => Promise<T>,
  defaultVal: T,
  logicalName: string
): Promise<{ results: T; hasError: boolean; errorMsg?: string }> => {
  try {
    const results = await call();
    return {
      results,
      hasError: false,
    };
  } catch (e: any) {
    console.error(`Failed to call ${logicalName}`, e);
    return {
      results: defaultVal,
      hasError: true,
      errorMsg: e?.toString(),
    };
  }
};
