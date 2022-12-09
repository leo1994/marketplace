import Store from '@domain/store'

export default interface StoreDBRepository {
  create: (store: Store) => Promise<Store>
  update: (store: Store) => Promise<Store | null>
  findById: (id: string) => Promise<Store | null>
}
