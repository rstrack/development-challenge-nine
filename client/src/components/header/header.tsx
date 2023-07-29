import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import MedcloudLogo from '../../assets/medcloud-white.png'

import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material'

import { Menu, Person } from '@mui/icons-material'
import { CustomListItemButton } from './styles'

const Header = () => {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleMenuClick = (route: string) => {
    navigate(route)
    setOpen(false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={() => setOpen(true)} sx={{ mr: 2 }}>
          <Menu sx={{ color: 'white' }} />
        </IconButton>
        <Link to="/">
          <img src={MedcloudLogo} width="150" />
        </Link>
        <SwipeableDrawer
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          PaperProps={{
            sx: {
              width: '300px',
            },
          }}
        >
          <List>
            <ListItem>
              <CustomListItemButton
                onClick={() => handleMenuClick('/patients')}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Pacientes" />
              </CustomListItemButton>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  )
}

export default Header