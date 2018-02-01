# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-26 21:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailredirects', '0005_capitalizeverbose'),
        ('wagtailcore', '0040_page_draft_title'),
        ('wagtailforms', '0003_capitalizeverbose'),
        ('cms', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentationPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('richtext', wagtail.wagtailcore.fields.RichTextField()),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.RemoveField(
            model_name='foopage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='foopage',
            name='page_ptr',
        ),
        migrations.DeleteModel(
            name='FooPage',
        ),
    ]
