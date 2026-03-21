import { useNavigate } from "react-router-dom";
import VerdenLogo from "@/components/verden/VerdenLogo";
import GlassButton from "@/components/verden/GlassButton";

const Index = () => {
  const navigate = useNavigate();
  navigate("/");
  return null;
};

export default Index;
