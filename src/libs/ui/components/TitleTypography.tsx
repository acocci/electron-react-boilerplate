import Typography from '@mui/material/Typography';

type PageTypographyProps = {
  title: string;
};

const TitleTypography = (props: PageTypographyProps) => (
  <>
    <Typography component="h1" variant="h2" color="text.primary" gutterBottom textAlign="left">
      {props.title}
    </Typography>
  </>
);

export default TitleTypography;
