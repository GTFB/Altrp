/**
 * Получить ссылку на состояние хранилища
 * @return {*}
 */
export default function getCurrentStoreState() {
  return appStore.getState();
}
