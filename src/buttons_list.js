/**
 * Buttons of "Reversão e avisos"
 *
 * @see [[MediaWiki:Gadget-diffTools.js]]
 * @author [[w:pt:User:Albertoleoncio]]
 */
/* jshint laxbreak: true */
/*global mw, $, diffTools */

( function ( df ) {
'use strict';

var pageName = df.pageName;

mw.messages.set( {
	// General
	'df-getPageHistory': 'Consultando o histórico da página "<a href="$1">$2</a>"...',
	'df-notifyTitle': 'Reversão e avisos',
	'df-diffTools': 'Reversão e avisos',
	'df-OK': 'OK',
	'df-cancel': 'Cancelar',

	// Dialog
	'df-dialog-commentary': 'Comentário a acrescentar ao resumo da edição',
	'df-dialog-remainingChar': 'Caracteres restantes: $1',

	// Edit
	'df-edit-preparing': 'Preparando a edição da página "$1"...',
	'df-edit-summaryPrefix': 'Desfeita(s) uma ou mais edições de [[Special:Contribs/$1|$1]]',
	'df-edit-success': '<p>A página "$1" <a href="$2">foi editada</a> (<a href="$3">abrir</a>).</p>',

	// Errors
	'df-error-API': 'Erro da API: $1. $2',
	'df-error-pageNotExist':' A página "<a href="$1">$2</a> não existe.',
	'df-error-unknown':'Houve um erro inesperado ao usar a API do MediaWiki.',
	'df-error-requestFail': 'Houve um erro ao requisitar a edição da página.',
	'df-error-ajaxFail-1':'Houve um erro ao usar AJAX para consultar o conteúdo da página.',
	'df-error-ajaxFail-2': 'Houve um erro ao usar AJAX para editar a página.'
} );

$.extend( df.buttons, {
	'revert': {
		'description': false,

		'Opções': {
			'Reverter': {
				'desc': 'Desfaz as últimas edições do artigo, para retornar à'
					+ ' versão mostrada à esquerda',
				'sum': 'Desfeita(s) uma ou mais edições de [[Special:Contribs/$2|$2]],'
			},

			'+comentário': {
				'desc': 'Desfaz as últimas edições do artigo para retornar à'
					+ ' versão mostrada à esquerda, mas permite incluir informações'
					+ ' extras no resumo da edição',
				'url': function () {
					df.revertWithComment();
				}
			}
		}
	},

	'warn': {
		'description': 'Usuário: ',

		'Avisos': {

			'bv': {
				'desc': 'Envia uma mensagem de boas-vindas ao novo usuário',
				'subst': 'bv',
				'sum': 'Mensagem de boas-vindas a novo usuário'
			},

			'assinando artigo': {
				'desc': 'Envia um aviso sobre assinatura em artigos ao usuário',
				'subst': 'Aviso-assinatura|' + pageName,
				'sum': 'Aviso sobre assinatura em artigos'
			},

			'autobiografia': {
				'desc': 'Envia um aviso sobre autobiografia ao usuário',
				'subst': 'Aviso-autobiografia|' + pageName,
				'sum': 'Aviso sobre autobiografia'
			},

			'VLP': {
				'desc': 'Envia um aviso sobre mudanças entre versões da língua portuguesa ao usuário',
				'subst': 'Aviso-ortografia|' + pageName,
				'sum': 'Aviso sobre mudanças entre [' + '[WP:VLP]]'
			},

			'fontes removidas': {
				'desc': 'Envia um aviso sobre remoção de fontes ao usuário',
				'subst': 'Av-fonte|' + pageName,
				'sum': 'Aviso sobre remoção de fontes'
			},

			'previsão': {
				'desc': 'Envia um aviso sobre botão de previsão ao usuário',
				'subst': 'Mostrar previsão|' + pageName,
				'sum': 'Aviso sobre botão de previsão'
			},

			'layout': {
				'desc': 'Envia um aviso sobre mudanças drásticas em layout de artigos ao usuário',
				'subst': 'Av-layout|' + pageName,
				'sum': 'Aviso sobre mudanças drásticas em layout de artigos'
			},

			'tradução': {
				'desc': 'Envia um aviso sobre tradução em andamento de artigos ao usuário',
				'subst': 'Aviso-tradução|' + pageName,
				'sum': 'Aviso sobre  tradução em andamento de artigos'
			},

			'informe': {
				'desc': 'Envia um aviso sobre inclusão de predefinição de aviso ou alerta em artigo sem informar ao usuário',
				'subst': 'informar|' + pageName,
				'sum': 'Aviso sobre inclusão de predefinição de aviso ou alerta em artigo sem informar ao usuário'
			},

			'conflito': {
				'desc': 'Envia um aviso sobre conflitos de interesses ao usuário',
				'subst': 'Aviso-conflito de interesses|' + pageName,
				'sum': 'Aviso sobre conflitos de interesses'
			},

			'bloq': {
 				'desc': 'Envia a notificação de bloqueio de 1 dia pelo vandalismo ao usuário',
 				'subst': 'Vandalismo|b|' + pageName + '|tempo=1 dia',
 				'sum': 'Notificação de bloqueio de 1 dia pelo vandalismo'
			},

			'VDA': {
				'desc': 'Envia um aviso sobre violação de direitos de autor ao usuário',
				'subst': 'Aviso-cópia|' + pageName,
				'sum': 'Aviso sobre violação de direitos de autor'
			},

			'VDA-suspeito': {
				'desc': 'Envia um aviso sobre suspeita de violação de direitos de autor ao usuário',
				'subst': 'Aviso-suspeito|' + pageName + '|15 minutos',
				'sum': 'Aviso sobre suspeita de violação de direitos de autor'
			}
		},
	},

	'Avisos de remoção de marcação de eliminação': {
		'description': 'Av-nr: ',

		'avisos': {

			'er': {
				'desc': 'Envia um aviso sobre remoção da marcação de eliminação rápida ao usuário',
				'subst': 'Aviso-não remova|' + pageName + '|er',
				'sum': 'Aviso sobre remoção da marcação de eliminação rápida'
			},

			'esr': {
				'desc': 'Envia um aviso sobre remoção da marcação de eliminação semirrápida ao usuário',
				'subst': 'Aviso-não remova|' + pageName + '|esr',
				'sum': 'Aviso sobre remoção da marcação de eliminação semirrápida'
			},

			'ec': {
				'desc': 'Envia um aviso sobre remoção da marcação de eliminação por consenso ao usuário',
				'subst': 'Aviso-não remova|' + pageName + '|ec',
				'sum': 'Aviso sobre remoção da marcação de eliminação por consenso'
			}
		}
	},

	'Genéricos': {
		'description': 'Genérico: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso ao usuário',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:aviso|' + pageName,
				'sum': 'Bem vindo + Aviso'
			},

			'1': {
				'desc': 'Envia o primeiro aviso ao usuário',
				'subst': 'aviso|' + pageName,
				'sum': 'Aviso'
			},

			'2': {
				'desc': 'Envia o segundo aviso ao usuário',
				'subst': 'aviso2|' + pageName,
				'sum': 'Segundo aviso'
			},

			'3': {
				'desc': 'Envia o terceiro aviso ao usuário',
				'subst': 'aviso3|' + pageName,
				'sum': 'Terceiro aviso'
			}
		}
	},

	'Vandalismos': {
		'description': 'Vandalismo: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre vandalismo ao usuário',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Vandalismo|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre vandalismo'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre vandalismo ao usuário',
				'subst': 'Vandalismo|1|' + pageName,
				'sum': 'Aviso sobre vandalismo'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre vandalismo ao usuário',
				'subst': 'Vandalismo|2|' + pageName,
				'sum': 'Segundo aviso sobre vandalismo'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre vandalismo ao usuário',
				'subst': 'Vandalismo|3|' + pageName,
				'sum': 'Terceiro aviso sobre vandalismo'
			}
		}
	},

	'Spam': {
		'description': 'Spam: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre inserção de spam ao usuário',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Av-Spam|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre spam'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre inserção de spam ao usuário',
				'subst': 'Av-Spam|1|' + pageName,
				'sum': 'Aviso sobre spam'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre inserção de spam ao usuário',
				'subst': 'Av-Spam|2|' + pageName,
				'sum': 'Segundo aviso sobre spam'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre inserção de spam ao usuário',
				'subst': 'Av-Spam|3|' + pageName,
				'sum': 'Terceiro aviso sobre spam'
			}
		}
	},

	'Publicidade': {
		'description': 'Publicidade: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre divulgação publicitária',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Av-pub|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre divulgação publicitária'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre divulgação publicitária',
				'subst': 'Av-pub|1|' + pageName,
				'sum': 'Aviso sobre divulgação publicitária'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre divulgação publicitária',
				'subst': 'Av-pub|2|' + pageName,
				'sum': 'Segundo aviso sobre divulgação publicitária'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre divulgação publicitária',
				'subst': 'Av-pub|3|' + pageName,
				'sum': 'Terceiro aviso sobre divulgação publicitária'
			}
		}
	},

	'Testes': {
		'description': 'Testes: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre testes ao usuário',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Av-teste|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre testes'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre testes ao usuário',
				'subst': 'Av-teste|1|' + pageName,
				'sum': 'Aviso sobre testes'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre testes ao usuário',
				'subst': 'Av-teste|2|' + pageName,
				'sum': 'Segundo aviso sobre testes'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre testes ao usuário',
				'subst': 'Av-teste|3|' + pageName,
				'sum': 'Terceiro aviso sobre testes'
			}
		}
	},

	'Fontes': {
		'description': 'Cite fontes: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre não citar as fontes ao usuário.',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Aviso-cite fonte|' + pageName,
				'sum': 'Bem vindo + Aviso sobre falta de fontes'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre não citar as fontes ao usuário.',
				'subst': 'Aviso-cite fonte|' + pageName,
				'sum': 'Aviso sobre falta de fontes'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre não citar as fontes ao usuário.',
				'subst': 'Aviso-cite fonte|' + pageName + '|2',
				'sum': 'Segundo aviso sobre falta de fontes'
			}
		}
	},

	'Remoção': {
		'description': 'Remoção: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre remoção de conteúdos ao usuário',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Av-Remoção|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre remoção de conteúdos'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre remoção de conteúdos ao usuário',
				'subst': 'Av-Remoção|1|' + pageName,
				'sum': 'Aviso sobre remoção de conteúdos'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre remoção de conteúdos ao usuário',
				'subst': 'Av-Remoção|2|' + pageName,
				'sum': 'Segundo aviso sobre remoção de conteúdos'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre remoção de conteúdos ao usuário',
				'subst': 'Av-Remoção|3|' + pageName,
				'sum': 'Terceiro aviso sobre remoção de conteúdos'
			}
		}
	},

	'RemoçãoTag': {
		'description': 'Tag removida: ',

		'avisos': {
			'bv+1': {
				'desc': 'Envia o Bem vindo + primeiro aviso sobre remoção de predefinições de manutenção',
				'subst': 'bv}' + '}~~' + '~~\n{' + '{subst:Aviso-tag|1|' + pageName,
				'sum': 'Bem vindo + Aviso sobre remoção de predefinições de manutenção'
			},

			'1': {
				'desc': 'Envia o primeiro aviso sobre remoção de predefinições de manutenção',
				'subst': 'Aviso-tag|1|' + pageName,
				'sum': 'Aviso sobre remoção de predefinições de manutenção'
			},

			'2': {
				'desc': 'Envia o segundo aviso sobre remoção de predefinições de manutenção',
				'subst': 'Aviso-tag|2|' + pageName,
				'sum': 'Segundo aviso sobre remoção de predefinições de manutenção'
			},

			'3': {
				'desc': 'Envia o terceiro aviso sobre remoção de predefinições de manutenção',
				'subst': 'Aviso-tag|3|' + pageName,
				'sum': 'Terceiro aviso sobre remoção de predefinições de manutenção'
			}
		}
	},

	'Branqueio PDU': {
		'description': 'Branqueio PDU: ',

		'avisos': {
			'1': {
				'desc': 'Envia uma mensagem sobre o branqueio da página de discussão do usuário.',
				'subst': 'Branqueio|1|' + '|~~' + '~~',
				'sum': 'Mensagem sobre branqueio da PDU'
			},

			'2': {
				'desc': 'Envia uma mensagem sobre remoção de avisos da página de discussão do usuário.',
				'subst': 'Branqueio|2|' + '|~~' + '~~',
				'sum': 'Mensagem sobre remoção de avisos da PDU'
			}
		}
	}
} );

}( diffTools ) );
