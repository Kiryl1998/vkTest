function initGroups(getGroups): void {
  getGroups()
    .then((data: Group[] | undefined) => setGroups(data ?? []))
    .finally(() => setLoading(false));
}
