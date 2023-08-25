import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle, subtitleYear }) => {
  return (
    <Box mb="30px" display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ height: "auto" }}>
      <Box gridColumn="span 8" sx={{ backgroundColor: "#51D2FF", textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            marginTop: "6px",
            color: "#016BB0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "#016BB0", fontWeight: "bold" }}>
          <a href="www.neuquencapital.gov.ar" target="_blank" rel="noreferrer noopener">
            www.neuquencapital.gov.ar
          </a>
        </Typography>
      </Box>
      <Box
        gridColumn="span 4"
        sx={{
          backgroundColor: "#1365ae",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          {subtitle}
        </Typography>

        <Typography variant="h6" sx={{ color: "#51D2FF", fontWeight: "bold" }}>
          {subtitleYear}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
