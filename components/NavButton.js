import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { useLanguageQuery } from 'next-export-i18n';

import { Button, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useTheme, useMenuOpen } from './states';

export default function NavButton(properties) {

  const colorScheme = properties.colorScheme;
  const inputText = properties.inputText;
  const language = properties.language;
  const url = properties.url;

  const [query] = useLanguageQuery();
  const [menuOpen, setMenuOpen] = useMenuOpen();
  const { hovered, ref } = useHover();

  return (
    <Link
      href={{
        pathname: url,
        query: query && query.lang ? `lang=${query['lang']}` : `lang=en`
      }}
      key={url.replace("/","")}
      passHref
    >
      <Button
        ref={ref}
        variant={colorScheme === "dark" ? "outline" : "light"}
        color={colorScheme === "dark" ? "dark" : "gray"}
        sx={{
          boxShadow: `0 0 ${hovered ? 5 : 2}px ${colorScheme === 'dark' ? 'white' : 'grey'}`,
          margin: '5px'
        }}
        onClick={() => setMenuOpen(false)}
      >
        <Text locale={language}>{inputText}</Text>
      </Button>
    </Link>
  );
}
