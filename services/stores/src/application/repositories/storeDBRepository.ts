import Store from '@domain/store'

export default interface StoreDBRepository {
  create: (store: Omit<Store, 'id'>) => Promise<Store>
  update: (store: Store) => Promise<Store | null>
  findById: (id: string) => Promise<Store | null>
  getAll: () => Promise<Store[]>
}
