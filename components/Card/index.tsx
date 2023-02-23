import { useEffect, useRef, useState } from 'preact/hooks';
import {
  getAnalyticsEnv,
  getGithubUrl,
  getProvider,
  utagRegex,
  utf8Decoder,
  vtgRegex,
} from '../../helpers';
import { showNotifier } from '../Notifier';
import Error from '../Error';
import Loading from '../Loading';
import styles from './styles.module.css';
import fileIcon from '../../assets/file-icon.svg';
import githubIcon from '../../assets/github-icon.svg';

export default function Card({ fileURL }: { fileURL: string }) {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [utagVersion, setUtagVersion] = useState('');
  const [vtgVersion, setVtgVersion] = useState('');
  const isFetching = useRef(true);
  const utagVersionRef = useRef('');
  const vtgVersionRef = useRef('');

  const onClick = (ev: any) => {
    navigator.clipboard.writeText(ev?.target?.innerHTML);
    showNotifier.value = true;
  };

  const cardBody = () => {
    if (isError) {
      return <Error />;
    } else if (isLoading) {
      return <Loading />;
    } else {
      return (
        <>
          <div class={styles.info}>
            <span class={styles['utag-label']}>Utag</span>
            <span class={styles.version} onClick={onClick}>
              {utagVersion}
            </span>
          </div>
          <div class={styles.info}>
            <span class={styles['vtg-label']}>VTG</span>
            <span class={styles.version} onClick={onClick}>
              {vtgVersion}
            </span>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    const parseUtagVersion = (match: RegExpMatchArray | null) => {
      const utagVersion = match?.[0].split(' ').pop()?.replace(',', '') || '';
      if (!utagVersionRef.current) {
        utagVersionRef.current = utagVersion;
        setUtagVersion(utagVersion);
      }
    };

    const parseVtgVersion = (match: RegExpMatchArray | null) => {
      const vtgVersion = match?.[0].split('return"').pop()?.slice(0, -2) || '';
      if (!vtgVersionRef.current) {
        vtgVersionRef.current = vtgVersion;
        setVtgVersion(vtgVersion);
      }
    };

    const parseFile = (file: string) => {
      parseUtagVersion((file as string).match(utagRegex));
      parseVtgVersion((file as string).match(vtgRegex));
    };

    const processFile = (
      fileReader: ReadableStreamDefaultReader<Uint8Array>
    ) => {
      fileReader
        .read()
        .then(function processText({ done, value }): Promise<void> {
          const chunk = value ? utf8Decoder.decode(value) : '';
          parseFile(chunk);

          if (done || (utagVersionRef.current && vtgVersionRef.current)) {
            return fileReader.cancel();
          }

          return fileReader.read().then(processText);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        });
    };

    const fetchFile = async () => {
      try {
        const { body, ok } = await fetch(fileURL);
        if (!ok) {
          throw Error();
        }
        const reader = (body as ReadableStream<Uint8Array>).getReader();
        processFile(reader);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        isFetching.current = false;
      }
    };

    fetchFile();
  }, []);

  useEffect(() => {
    if ((utagVersion || vtgVersion) && !isFetching.current) {
      setLoading(false);
    }
    if (!utagVersion) {
      setUtagVersion('No reliable');
    }
    if (!vtgVersion) {
      setVtgVersion('No reliable');
    }
  }, [utagVersion, vtgVersion]);

  return (
    <div class={styles.card}>
      <div class={styles.head}>
        <a href={getGithubUrl(getProvider(fileURL))} target="_blank">
          <img
            src={githubIcon}
            alt="github"
            title="Go to Github source code page"
          />
        </a>
        <span>{getAnalyticsEnv(fileURL)}</span>
        <a href={fileURL} target="_blank">
          <img src={fileIcon} alt="file" title="See source code" />
        </a>
      </div>
      <hr />
      <div class={styles.body}>{cardBody()}</div>
    </div>
  );
}
