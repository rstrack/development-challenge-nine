import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import MedcloudLogoWhite from '../../assets/medcloud-white.png'
import MedcloudLogoSvg from '../../assets/medcloud.svg'

import {
  AppBar,
  Divider,
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
        <Link to="/home">
          <img src={MedcloudLogoWhite} width="150" />
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
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '8px',
              }}
            >
              <img src={MedcloudLogoSvg} width="200" />
            </ListItem>
            <Divider />
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
