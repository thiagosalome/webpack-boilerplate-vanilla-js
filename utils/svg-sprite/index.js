const SVGSpriter = require('svg-sprite')
const mkdirp = require('mkdirp')
const glob = require('glob')

const fs = require('fs')
const path = require('path')
const cwd = path.resolve('./src/assets/images/svgs')
const { exec } = require('child_process')

const tagBuildSprite = require('./../../package.json')['tag-build-sprite']

const spriter = new SVGSpriter({
  dest: path.resolve('./src'),
  mode: {
    css: {
      dest: '.',
      sprite: `assets/images/sprite.${tagBuildSprite}.svg`,
      bust: false,
      render: {
        scss: {
          dest: 'assets/styles/abstracts/_sprite.scss',
          template: path.resolve('./utils/svg-sprite/tmpl/template.scss')
        }
      },
      variables: {
        png: () => (spriter, render) => render(spriter).split('.svg').join('.png'),
        backgroundsize: () => (spriteAndPath, render) => {
          const paths = render(spriteAndPath).split(',')
          return (paths[0] / paths[1]) * 100
        }
      },
      example: {
        dest: path.resolve('./utils/svg-sprite/preview-sprite-svg-scss.html')
      }
    }
  }
})

// Find SVG files recursively via `glob`
glob.glob('**/*.svg', { cwd: cwd }, function (error, files) {
  if (error) {
    console.log(error)
  }

  files.forEach(function (file) {
    spriter.add(
      path.resolve(path.join(cwd, file)),
      file,
      fs.readFileSync(path.join(cwd, file), { encoding: 'utf-8' })
    )
  })

  spriter.compile(function (error, result, data) {
    if (error) {
      console.log(error)
    }
    for (var type in result.css) {
      let svg = result.css[type].path
      mkdirp.sync(path.dirname(svg))

      if (type === 'sprite') {
        let png = svg.split('.svg')[0] + '.png'

        // delete file if exist
        if (fs.existsSync(png)) {
          fs.unlink(png, (err) => {
            if (err) throw err
            console.log(`${png} was deleted`)
          })
        }

        // convert svg in png
        exec(`svg2png "${svg}" --output="${png}"`, (err, stdout, stderr) => {
          if (err) {
            console.error(err)
            return
          }
          console.log(`Your SVG and clone PNG file was create!`)
        })
      }
      fs.writeFileSync(svg, result.css[type].contents)
    }
  })
})
