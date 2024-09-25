interface Response {
  success: boolean;
  error?: any;
}

export const handleRequest = async <T extends Response>(
  requestFunction: () => Promise<T>,
  onSuccess: (data: T) => void,
  onError?: (error: string) => void
) => {
  try {
    const res = await requestFunction();
    if (res?.success) {
      onSuccess(res);
    } else {
      onError?.(res?.error || "Une erreur est survenue");
    }
  } catch (error: any) {
    onError?.(error?.message || "La requête a échoué");
  }
};
