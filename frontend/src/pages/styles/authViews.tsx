const styles: { [Key: string]: React.CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        position: 'relative',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '400px',
      margin: 'auto',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '0.5rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    section: {
      marginTop: '1rem',
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
      marginLeft: '0.5rem',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    success: {
      color: 'green',
      marginTop: '10px',
    },
}

export default styles;