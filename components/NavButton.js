import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguageQuery } from 'next-export-i18n';

import { Button, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useAppStore } from './states';

export default function NavButton(properties) {
  const theme = useAppStore((state) => state.theme);

  const { inputText } = properties;
  const { language } = properties;
  const { url } = properties;

  const [query] = useLanguageQuery();

  const setMenuOpen = useAppStore((state) => state.setMenuOpen);
  const { hovered, ref } = useHover();

  return (
    <Link
      href={{
        pathname: url,
        query: query && query.lang ? `lang=${query.lang}` : 'lang=en',
      }}
      key={url.replace('/', '')}
      passHref
    >
      <Button
        ref={ref}
        variant={theme === 'dark' ? 'outline' : 'light'}
        color={theme === 'dark' ? 'dark' : 'gray'}
        sx={{
          boxShadow: `0 0 ${hovered ? 5 : 2}px ${theme === 'dark' ? 'white' : 'grey'}`,
          margin: '5px',
        }}
        onClick={() => setMenuOpen(false)}
      >
        <Text locale={language}>{inputText}</Text>
      </Button>
    </Link>
  );
}
