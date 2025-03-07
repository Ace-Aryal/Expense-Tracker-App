import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Illustration } from './pageNotFoundAssets/Illustration';
import classes from './pageNotFoundAssets//NothingFoundBackground.module.css';
import { Link } from 'react-router-dom';

export function PageNotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Link to="/">
            <Button size="md">Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default PageNotFound