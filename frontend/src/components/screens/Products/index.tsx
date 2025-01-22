import { HeaderPage } from '../../_ui/HeaderPage'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import { FilterByName } from '../../_ui/FilterByName'
import style from './Products.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useProductList } from '../../../hooks/useProductList'
import { useDeleteProduct } from './hooks/useDeleteProduct'
import { useEditProduct } from './hooks/useEditProduct'

export function Products() {
  const { loadingProducts, products, filterProducts, setFilterProducts } =
    useProductList()
  const { handleDeleteProduct } = useDeleteProduct()
  const {
    formModalOpened,
    handleEditProduct,
    productDataToEdit,
    setFormModalOpened,
    setProductDataToEdit,
  } = useEditProduct()

  const columns: IColumn[] = useColumns({
    handleEditProduct,
    handleDeleteProduct,
  })

  const fieldsMobile = useFieldsMobile()

  function handleFilterByName(searchString: string) {
    if (searchString.length > 2) {
      setFilterProducts((prev) =>
        prev.filter((prod) =>
          prod.name.toLowerCase().includes(searchString.toLowerCase()),
        ),
      )
    } else {
      setFilterProducts(products)
    }
  }

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo produto"
        InputFilter={<FilterByName handleFilterByName={handleFilterByName} />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingProducts}
          columns={columns}
          rows={filterProducts}
          emptyText="Nenhum produto cadastrado"
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          collapseItems={columns}
          itemFields={fieldsMobile}
          items={filterProducts}
          loading={loadingProducts}
          emptyText="Nenhum produto cadastrado"
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewProduct
          productDataToEdit={productDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setProductDataToEdit(null)
          }}
        />
      )}
    </>
  )
}
