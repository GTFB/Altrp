<?php


namespace App\Services;


class AltrpInputStreamService
{
    /**
     * @abstract Сырые данные потока ввода
     */
    protected $input;

    /**
     * @function __construct
     *
     * @param array $data stream
     */
    public function __construct(array &$data)
    {
        $this->input = file_get_contents('php://input');
        $boundary = $this->boundary();
        if (!strlen($boundary)) {
            $data = [
                'post' => $this->parse(),
                'file' => []
            ];
        } else {
            $blocks = $this->split($boundary);
            $data = $this->blocks($blocks);
        }
        return $data;
    }

    /**
     * @returns string
     */
    private function boundary()
    {
        if(!isset($_SERVER['CONTENT_TYPE'])) {
            return null;
        }
        preg_match('/boundary=(.*)$/', $_SERVER['CONTENT_TYPE'], $matches);
        return $matches[1];
    }

    /**
     * Спарсить строку потока ввода
     * @returns array
     */
    private function parse()
    {
        parse_str(urldecode($this->input), $result);
        return $result;
    }

    /**
     * Разделить массивы данных
     * @param $boundary string
     * @returns array
     */
    private function split($boundary)
    {
        $result = preg_split("/-+$boundary/", $this->input);
        array_pop($result);
        return $result;
    }

    /**
     * Получить окончательный массив данных
     * @param $array array
     * @returns array
     */
    private function blocks($array)
    {
        $results = [
            'post' => [],
            'file' => []
        ];
        foreach($array as $key => $value)
        {
            if (empty($value))
                continue;
            $block = $this->decide($value);
            if (count($block['post']) > 0)
                array_push($results['post'], $block['post']);
            if (count($block['file']) > 0)
                array_push($results['file'], $block['file']);
        }
        return $this->merge($results);
    }

    /**
     * Вернуть соответсвующий массив данных с ключами file и post
     * @param $string string
     * @returns array
     */
    private function decide($string)
    {
        if (strpos($string, 'application/octet-stream') !== FALSE)
        {
            return [
                'post' => $this->file($string),
                'file' => []
            ];
        }
        if (strpos($string, 'filename') !== FALSE)
        {
            return [
                'post' => [],
                'file' => $this->file_stream($string)
            ];
        }
        return [
            'post' => $this->post($string),
            'file' => []
        ];
    }

    /**
     * Найти совпадения с файлом
     * @param $string
     *
     * @return array
     */
    private function file($string)
    {
        preg_match('/name=\"([^\"]*)\".*stream[\n|\r]+([^\n\r].*)?$/s', $string, $match);
        return [
            $match[1] => (!empty($match[2]) ? $match[2] : '')
        ];
    }

    /**
     * Получить данные файла
     * @param $string
     *
     * @return array
     */
    private function file_stream($string)
    {
        $data = [];
        preg_match('/name=\"([^\"]*)\"; filename=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $string, $match);
        preg_match('/Content-Type: (.*)?/', $match[3], $mime);
        $image = preg_replace('/Content-Type: (.*)[^\n\r]/', '', $match[3]);
        $path = sys_get_temp_dir().'/php'.substr(sha1(rand()), 0, 6);
        $err = file_put_contents($path, ltrim($image));
        if (preg_match('/^(.*)\[\]$/i', $match[1], $tmp)) {
            $index = $tmp[1];
        } else {
            $index = $match[1];
        }
        $data[$index]['name'][] = $match[2];
        $data[$index]['type'][] = $mime[1];
        $data[$index]['tmp_name'][] = $path;
        $data[$index]['error'][] = ($err === FALSE) ? $err : 0;
        $data[$index]['size'][] = filesize($path);
        return $data;
    }

    /**
     * Получить данные запроса без файлов
     * @param $string
     *
     * @return array
     */
    private function post($string)
    {
        $data = [];
        preg_match('/name=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $string, $match);
        if (preg_match('/^(.*)\[\]$/i', $match[1], $tmp)) {
            $data[$tmp[1]][] = (!empty($match[2]) ? $match[2] : '');
        } else {
            $data[$match[1]] = (!empty($match[2]) ? $match[2] : '');
        }
        return $data;
    }

    /**
     * Соединить массив параметров и файлов
     * @param $array array
     *
     * @returns array
     */
    private function merge($array)
    {
        $results = [
            'post' => [],
            'file' => []
        ];
        if (count($array['post']) > 0) {
            foreach($array['post'] as $key => $value) {
                foreach($value as $k => $v) {
                    if (is_array($v)) {
                        foreach($v as $kk => $vv) {
                            $results['post'][$k][] = $vv;
                        }
                    } else {
                        $results['post'][$k] = $v;
                    }
                }
            }
        }
        if (count($array['file']) > 0) {
            foreach($array['file'] as $key => $value) {
                foreach($value as $k => $v) {
                    if (is_array($v)) {
                        foreach($v as $kk => $vv) {
                            if(is_array($vv) && (count($vv) === 1)) {
                                $results['file'][$k][$kk] = $vv[0];
                            } else {
                                $results['file'][$k][$kk][] = $vv[0];
                            }
                        }
                    } else {
                        $results['file'][$k][$key] = $v;
                    }
                }
            }
        }
        return $results;
    }
}
