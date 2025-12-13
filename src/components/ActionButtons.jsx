import { Box, Button } from '@mui/material'
import { PrimaryColor, PrimaryThemeColor } from '../utils/constant'

const ActionButtons = ({ id, addText, editText, onAdd, onEdit }) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button color="primary" variant="outlined" sx={{ textTransform: 'none', borderColor: PrimaryColor, color: PrimaryColor }} size="small" onClick={() => onEdit(id)}>{editText}</Button>
        <Button color="success" variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} size="small" onClick={() => onAdd(id)}>{addText}</Button>
      </Box>
    </>
  )
}

export default ActionButtons