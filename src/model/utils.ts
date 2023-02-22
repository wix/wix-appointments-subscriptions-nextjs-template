export const safeCall = async <T>(
  call: () => Promise<T>,
  defaultVal: T,
  logicalName: string
): Promise<{ data: T; hasError: boolean; errorMsg?: string }> => {
  try {
    const results = await call();
    return {
      data: results,
      hasError: false,
    };
  } catch (e: any) {
    console.error(`Failed to call ${logicalName}`, e);
    return {
      data: defaultVal,
      hasError: true,
      errorMsg: e?.toString(),
    };
  }
};
