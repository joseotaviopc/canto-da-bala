import { CustomTextField } from '../CustomTextField'
import style from './FilterByName.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useFilterByName } from './hooks/useFilterByName'

type Props = {
  handleFilterByName: (searchString: string) => void
}
export function FilterByName({ handleFilterByName }: Props) {
  const { errors, handleSubmit, onFilterByName, register } = useFilterByName()

  return (
    <form
      className={style.filterContainer}
      onSubmit={handleSubmit(onFilterByName)}
    >
      <CustomTextField
        size="small"
        type="text"
        label="Nome"
        placeholder="Digite o nome"
        className={style.input}
        {...register('searchString')}
        onChange={(e) => handleFilterByName(e.target.value)}
        error={!!errors.searchString}
      />
      <button type="submit">
        <FontAwesomeIcon className={style.icon} icon={faSearch} />
        Filtrar
      </button>
    </form>
  )
}
