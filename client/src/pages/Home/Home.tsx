import { IconButton, Typography } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'
import { ExternalDiv, TextDiv } from './styles'

const Home = () => {
  return (
    <ExternalDiv>
      <TextDiv>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Bem-vindo(a)!
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Desenvolvido por Rafael Strack
        </Typography>
      </TextDiv>
      <IconButton
        size="large"
        href="https://github.com/rstrack"
        target="_blank"
      >
        <GitHub sx={{ fontSize: '32px' }} />
      </IconButton>
      <IconButton
        size="large"
        href="https://www.linkedin.com/in/rafaelstrack/"
        target="_blank"
      >
        <LinkedIn sx={{ fontSize: '32px' }} />
      </IconButton>
    </ExternalDiv>
  )
}

export default Home
