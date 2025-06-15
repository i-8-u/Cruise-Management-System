import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Anchor, Users, ArrowRight } from "lucide-react"

const WelcomePage = () => {
  const [mounted, setMounted] = useState(false)

  const userRoles = [
    {
      id: "voyager",
      title: "Voyager",
      icon: <Anchor className="role-icon" style={styles.roleIcon} />,
      description: "Access your cruise experience with our premium services and amenities.",
      color: "#ff6b81",
    },
    {
      id: "crew",
      title: "Crew Member",
      icon: <Users className="role-icon" style={styles.roleIcon} />,
      description: "Access crew portal for schedules, tasks, and ship operations.",
      color: "#3498db",
    },
  ]

  // Add keyframe animations to document
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = `
      @keyframes wave {
        0% {
          transform: translateX(0) translateZ(0) scaleY(1);
        }
        50% {
          transform: translateX(-25%) translateZ(0) scaleY(0.8);
        }
        100% {
          transform: translateX(-50%) translateZ(0) scaleY(1);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -100% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    `
    document.head.appendChild(styleSheet)

    // Set mounted after a small delay to trigger animations
    setTimeout(() => {
      setMounted(true)
    }, 100)

    // Clean up
    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  return (
    <div
      style={{
        ...styles.welcomeContainer,
        "--wave-color-1": "rgba(100, 200, 255, 0.3)",
        "--wave-color-2": "rgba(100, 200, 255, 0.5)",
      }}
    >
      <div style={styles.logo}>
        <img src='/logo.png' alt="Got Cooked !" />
      </div>

      <div style={styles.oceanBackground}>
        <div style={styles.wave}></div>
        <div style={{ ...styles.wave, ...styles.wave2 }}></div>
      </div>

      <div style={styles.content}>
        <h1
          style={{
            ...styles.welcomeTitle,
            animation: mounted ? "fadeInUp 0.8s ease-out forwards" : "none",
            opacity: mounted ? 1 : 0,
          }}
        >
          Welcome Onboard
        </h1>
        <p
          style={{
            ...styles.welcomeSubtitle,
            animation: mounted ? "fadeInUp 0.8s ease-out 0.2s forwards" : "none",
            opacity: mounted ? 1 : 0,
          }}
        >
          Please select your role to continue
        </p>

        <div style={styles.roleCardsContainer}>
          {userRoles.map((role, index) => (
            <Link to={`/login/${role.id}`} key={role.id} style={styles.roleCardLink}>
              <div
                style={{
                  ...styles.roleCard,
                  borderTop: `4px solid ${role.color}`,
                  animation: mounted ? `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s forwards` : "none",
                  opacity: mounted ? 1 : 0,
                }}
                className="role-card"
              >
                <div style={styles.roleCardHeader}>
                  <div
                    style={{
                      ...styles.roleIconContainer,
                      backgroundColor: role.color,
                      animation: "float 3s ease-in-out infinite",
                    }}
                  >
                    {role.icon}
                  </div>
                  <h2 style={styles.roleTitle}>{role.title}</h2>
                </div>
                <p style={styles.roleDescription}>{role.description}</p>
                <div
                  style={{
                    ...styles.loginButton,
                    backgroundColor: role.color,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, 
                      rgba(255,255,255,0) 0%, 
                      rgba(255,255,255,0.3) 50%, 
                      rgba(255,255,255,0) 100%)`,
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                      zIndex: 0,
                    }}
                  ></div>
                  <span style={{ position: "relative", zIndex: 1 }}>Login</span>
                  <ArrowRight size={16} style={{ position: "relative", zIndex: 1 }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// All styles defined as JavaScript objects
const styles = {
  welcomeContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "2rem 1rem",
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "30px",
    width: "160px",
    height: "auto",
    zIndex: 10,
    animation: "fadeInUp 0.8s ease-out",
    opacity: 1,
  },
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "2rem 1rem",
  },
  shipBody: {
    position: "absolute",
    top: "5px",
    left: "5px",
    width: "30px",
    height: "20px",
    backgroundColor: "#1a3a5f",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  shipWindow: {
    width: "5px",
    height: "5px",
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  shipBottom: {
    position: "absolute",
    top: "25px",
    left: "0",
    width: "40px",
    height: "10px",
    backgroundColor: "#3498db",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  waves: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "40px",
    height: "5px",
  },
  wave1: {
    position: "absolute",
    bottom: "0",
    left: "5px",
    width: "30px",
    height: "3px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "50%",
  },
  // wave2: {
  //   position: "absolute",
  //   bottom: "0",
  //   left: "0",
  //   width: "40px",
  //   height: "2px",
  //   backgroundColor: "rgba(255, 255, 255, 0.4)",
  //   borderRadius: "50%",
  // },
  oceanBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: -1,
    overflow: "hidden",
  },
  wave: {
    background: "var(--wave-color-1)",
    position: "absolute",
    width: "200%",
    height: "200px",
    bottom: "-25px",
    left: "-50%",
    borderRadius: "100%",
    animation: "wave 15s infinite linear",
  },
  wave2: {
    background: "var(--wave-color-2)",
    bottom: "-50px",
    animation: "wave 17s infinite linear",
  },
  content: {
    width: "100%",
    maxWidth: "1200px",
    zIndex: 1,
    marginTop: "2rem",
  },
  welcomeTitle: {
    fontSize: "3rem",
    color: "#1a3a5f",
    textAlign: "center",
    marginBottom: "0.5rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  welcomeSubtitle: {
    fontSize: "1.2rem",
    color: "#4a6fa5",
    textAlign: "center",
    marginBottom: "3rem",
  },
  roleCardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "4rem",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  roleCardLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    transition: "transform 0.3s ease",
  },
  roleCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    height: "130%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-10px) scale(1.02)",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    },
  },
  roleCardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    position: "relative",
    zIndex: 1,
  },
  roleIconContainer: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem",
    color: "white",
    transition: "transform 0.3s ease",
  },
  roleIcon: {
    width: "24px",
    height: "24px",
  },
  roleTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1a3a5f",
    margin: 0,
  },
  roleDescription: {
    color: "#666",
    marginBottom: "1.5rem",
    lineHeight: 1.5,
    flexGrow: 1,
    position: "relative",
    zIndex: 1,
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    alignSelf: "flex-start",
    marginTop: "auto",
    position: "relative",
    zIndex: 1,
  },
}

export default WelcomePage
