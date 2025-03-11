const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#282c34',
      color: 'white',
    },
    navbarLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    navbarRight: {
      display: 'flex',
      alignItems: 'center',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
    },
    profilePicture: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '1rem',
    },
    username: {
      marginRight: '1rem',
    },
    menuButton: {
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '60px',
      right: '1rem',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '0.5rem',
      zIndex: 1000,
    },
    dropdownItem: {
      display: 'block',
      paddingInline: '0.5rem',
      margin: '10px 0',
      color: '#007BFF',
      textDecoration: 'none',
    },
    content: {
      flex: 1,
      padding: '1rem',
      textAlign: 'center',
    },
  };

  export default styles;