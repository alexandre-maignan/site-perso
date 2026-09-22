<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

    <xsl:output
        method="html"
        encoding="UTF-8"
        indent="yes"/>

    <xsl:template match="/">

        <html lang="fr">

            <head>

                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <title>Alexandre Maignan — Sitemap</title>

                <style>

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        background: #f5f2eb;
                        color: #111;

                        font-family: Arial, sans-serif;

                        -webkit-font-smoothing: antialiased;
                    }

                    .container {
                        width: min(900px, calc(100% - 48px));
                        margin: 0 auto;
                        padding: 100px 0 80px;
                    }

                    .eyebrow {
                        margin: 0 0 16px;

                        font-size: 11px;
                        font-weight: 500;
                        letter-spacing: 0.14em;
                        text-transform: uppercase;

                        color: #777;
                    }

                    h1 {
                        margin: 0;

                        font-family: Georgia, serif;
                        font-size: clamp(44px, 7vw, 68px);
                        font-weight: 400;
                        line-height: 1.05;
                    }

                    .intro {
                        margin: 24px 0 64px;

                        color: #666;
                        font-size: 14px;
                    }

                    .sitemap {
                        border-top: 1px solid #d8d3ca;
                    }

                    .item {
                        display: grid;
                        grid-template-columns: 48px 1fr auto;

                        align-items: center;

                        gap: 24px;

                        padding: 24px 0;

                        border-bottom: 1px solid #d8d3ca;

                        color: #111;
                        text-decoration: none;
                    }

                    .item:hover {
                        padding-left: 8px;
                    }

                    .number {
                        color: #999;

                        font-size: 11px;
                        letter-spacing: 0.08em;
                    }

                    .name {
                        font-family: Georgia, serif;
                        font-size: 20px;
                    }

                    .url {
                        color: #999;
                        font-size: 11px;
                    }

                    .arrow {
                        margin-left: 10px;
                        color: #777;
                        font-size: 15px;
                    }

                    footer {
                        display: flex;
                        justify-content: space-between;

                        margin-top: 64px;

                        color: #888;

                        font-size: 11px;
                    }

                    footer a {
                        color: inherit;
                        text-decoration: none;
                    }

                    footer a:hover {
                        color: #111;
                    }

                    @media (max-width: 700px) {

                        .container {
                            width: calc(100% - 36px);
                            padding: 64px 0 48px;
                        }

                        .intro {
                            margin-bottom: 48px;
                        }

                        .item {
                            grid-template-columns: 32px 1fr auto;
                            gap: 12px;
                            padding: 20px 0;
                        }

                        .item:hover {
                            padding-left: 0;
                        }

                        .name {
                            font-size: 18px;
                        }

                        .url {
                            display: none;
                        }

                        footer {
                            flex-direction: column;
                            gap: 8px;
                        }

                    }

                </style>

            </head>

            <body>

                <main class="container">

                    <p class="eyebrow">
                        Alexandre Maignan
                    </p>

                    <h1>
                        Sitemap
                    </h1>

                    <p class="intro">
                        Liste des pages principales du site.
                    </p>

                    <div class="sitemap">

                        <xsl:for-each select="s:urlset/s:url">

                            <a class="item" href="{s:loc}">

                                <span class="number">
                                    <xsl:value-of select="format-number(position(), '00')"/>
                                </span>

                                <span class="name">

                                    <xsl:choose>

                                        <xsl:when test="contains(s:loc, 'dessins')">
                                            Dessins
                                        </xsl:when>

                                        <xsl:when test="contains(s:loc, 'sculptures')">
                                            Sculptures
                                        </xsl:when>

                                        <xsl:when test="contains(s:loc, 'a-propos')">
                                            À propos
                                        </xsl:when>

                                        <xsl:otherwise>
                                            Accueil
                                        </xsl:otherwise>

                                    </xsl:choose>

                                </span>

                                <span class="url">
                                    <xsl:value-of select="s:loc"/>
                                    <span class="arrow">→</span>
                                </span>

                            </a>

                        </xsl:for-each>

                    </div>

                    <footer>

                        <span>
                            XML Sitemap
                        </span>

                        <a href="https://alexandre-maignan.github.io/portfolio/">
                            alexandre-maignan.github.io
                        </a>

                    </footer>

                </main>

            </body>

        </html>

    </xsl:template>

</xsl:stylesheet>