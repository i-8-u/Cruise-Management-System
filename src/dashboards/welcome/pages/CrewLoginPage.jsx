import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Users, ArrowLeft, LogIn, AlertCircle, X } from "lucide-react"

// Firebase
import { useNavigate } from "react-router-dom"
import {app, auth, db } from "../../../firebase/firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";


const CrewLoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorType, setErrorType] = useState(null) // 'not-found' or 'invalid-credentials'
  const [showPopup, setShowPopup] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roleInfo = {
    title: "Crew Member",
    icon: <Users className="role-icon" style={styles.roleIcon} />,
    color: "#3498db",
  }

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
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes popupWave {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
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
      
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
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

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    let timer
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false)
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [showPopup])

  const navigate = useNavigate(); // already in your code
  
  const navigateToDashboard = (role) => {
    switch (role) {
      case "Admin":
        navigate("/admin");
        break;
      case "HeadCook":
        navigate("/headCook");
        break;
      case "Manager":
        navigate("/manager");
        break;
      case "Supervisor":
        navigate("/supervisor");
        break;
      case "Voyager":
        navigate("/voyager");
        break;
      default:
        navigate("/"); // fallback home
    }
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!email || !password) return;
    
      setIsSubmitting(true);
    
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Now QUERY the crewMembers collection for the user's email
        const q = query(collection(db, "crewMembers"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];  // Get the first matching document

          const userData = userDoc.data();        // FULL user data

          console.log("User Data:", userData);

          // Save user data to localStorage
          localStorage.setItem("userData", JSON.stringify(userData));

          const userRole = userDoc.data().role;
          console.log("User Role:", userRole);
          
          navigateToDashboard(userRole);
          console.log("Successfully Logged in !")
        } else {
          console.log("No crew document with this email found!");
          setErrorType("not-found");
          setShowPopup(true)
        }
    
        // console.log("Successfully Logged-in");
        
      } catch (error) {
        console.error(error);
        if (error.code === "auth/user-not-found") {
          setErrorType("not-found");
        } else if (error.code === "auth/wrong-password") {
          setErrorType("invalid-credentials");
        } else {
          setErrorType("unknown-error");
        }
        setShowPopup(true);
      }
      setIsSubmitting(false);
  };

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div
      style={{
        ...styles.loginContainer,
        "--login-accent-color": roleInfo.color,
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

      <div style={styles.loginContent}>
        <Link to="/" style={styles.backButton}>
          <div style={styles.backButtonInner}>
            <div style={styles.backIconContainer}>
              <ArrowLeft size={20} />
            </div>
            <span>Return to Deck</span>
          </div>
        </Link>

        <div
          style={{
            ...styles.loginCard,
            borderTop: `4px solid ${roleInfo.color}`,
            animation: mounted ? "fadeInUp 0.8s ease-out forwards" : "none",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div style={styles.loginHeader}>
            <div
              style={{
                ...styles.loginIconContainer,
                backgroundColor: roleInfo.color,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {roleInfo.icon}
            </div>
            <h1
              style={{
                ...styles.loginTitle,
                animation: mounted ? "fadeInUp 0.6s ease-out 0.3s forwards" : "none",
                opacity: mounted ? 1 : 0,
              }}
            >
              {roleInfo.title} Login
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              ...styles.loginForm,
              animation: mounted ? "fadeInUp 0.6s ease-out 0.4s forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            <div style={styles.formGroup}>
              <label
                htmlFor="email"
                style={{
                  ...styles.label,
                  color: focusedInput === "email" ? roleInfo.color : "#4a6fa5",
                  transition: "color 0.3s ease",
                }}
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your email"
                style={{
                  ...styles.input,
                  borderColor: focusedInput === "email" ? roleInfo.color : "#ddd",
                  boxShadow: focusedInput === "email" ? `0 0 0 2px ${roleInfo.color}20` : "none",
                  transform: focusedInput === "email" ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label
                htmlFor="password"
                style={{
                  ...styles.label,
                  color: focusedInput === "password" ? roleInfo.color : "#4a6fa5",
                  transition: "color 0.3s ease",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your password"
                style={{
                  ...styles.input,
                  borderColor: focusedInput === "password" ? roleInfo.color : "#ddd",
                  boxShadow: focusedInput === "password" ? `0 0 0 2px ${roleInfo.color}20` : "none",
                  transform: focusedInput === "password" ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                backgroundColor: roleInfo.color,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isSubmitting ? (
                <>
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      marginRight: "8px",
                    }}
                  ></div>
                  Logging in...
                </>
              ) : (
                <>
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
                  <LogIn size={18} style={{ position: "relative", zIndex: 1 }} />
                  <span style={{ position: "relative", zIndex: 1 }}>Login</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Error Popup */}
      {showPopup && (
        <div
          style={{
            ...styles.errorPopup,
            borderColor: roleInfo.color,
            animation: "slideIn 0.4s ease-out forwards",
          }}
        >
          <div
            style={{
              ...styles.errorPopupHeader,
              backgroundColor: roleInfo.color,
            }}
          >
            <AlertCircle size={20} />
            <span style={styles.errorPopupTitle}>Authentication Error</span>
            <button style={styles.closePopup} onClick={closePopup}>
              <X size={18} />
            </button>
          </div>
          <div style={styles.errorPopupContent}>
            {errorType === "not-found" ? (
              <p style={styles.errorText}>User not found. Contact Admin.</p>
            ) : (
              <p style={styles.errorText}>Invalid Credentials.</p>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)`,
              animation: "popupWave 2s infinite linear",
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

// All styles defined as JavaScript objects
const styles = {
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
  loginContent: {
    width: "100%",
    maxWidth: "500px",
    zIndex: 1,
    position: "relative",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "2rem",
    position: "relative",
    perspective: "1000px",
    textDecoration: "none",
  },
  backButtonInner: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    background: "linear-gradient(135deg, #1a3a5f 0%, #2c5282 100%)",
    color: "white",
    padding: "0.75rem 1.25rem",
    borderRadius: "30px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(26, 58, 95, 0.3)",
    transformStyle: "preserve-3d",
    transition: "all 0.3s ease",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
  backIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    transition: "transform 0.3s ease",
  },
  loginCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  loginHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  loginIconContainer: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem",
    color: "white",
  },
  roleIcon: {
    width: "24px",
    height: "24px",
  },
  loginTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#1a3a5f",
    margin: 0,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "500",
    color: "#4a6fa5",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    marginTop: "1rem",
    border: "none",
    cursor: "pointer",
  },
  errorPopup: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "320px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    zIndex: 1000,
    borderLeft: "4px solid",
  },
  errorPopupHeader: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    color: "white",
    gap: "10px",
  },
  errorPopupTitle: {
    flexGrow: 1,
    fontWeight: 600,
  },
  closePopup: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    transition: "background-color 0.2s",
  },
  errorPopupContent: {
    padding: "15px",
    fontSize: "0.95rem",
  },
  errorText: {
    margin: 0,
    lineHeight: 1.5,
  },
}

export default CrewLoginPage
